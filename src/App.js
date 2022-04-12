import React, {useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import background from "./background.png";
import axios from "axios";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig} from "@nfteyez/sol-rayz";
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

var publicKey;
var allNftData;

var loc = window.location.href+'';
if (loc.indexOf('http://')==0){
  window.location.href = loc.replace('http://','https://');
}

const unityContext = new UnityContext({
  loaderUrl: "./Build/build.loader.js",
  dataUrl: "./Build/build.data.unityweb",
  frameworkUrl: "./Build/build.framework.js.unityweb",
  codeUrl: "./Build/build.wasm.unityweb"
});

const firebaseConfig = {
  apiKey: "AIzaSyDcvry5_ArzMtQPFKAqawHgnAZuBusa_Ws",
  authDomain: "moonland-8788b.firebaseapp.com",
  projectId: "moonland-8788b",
  storageBucket: "moonland-8788b.appspot.com",
  messagingSenderId: "533308612802",
  appId: "1:533308612802:web:2f02128e0d471808d3db5b",
  measurementId: "G-GQHPLJ7Y5M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progression, setProgression] = useState(0);
  const [provider, setProvider] = useState("");


  const getProvider = async () => {
    if ("solana" in window) {
      await window.solana.connect(); 
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    } else {
      window.alert('Install https://www.phantom.app/');
    }
  };

  async function letsgo() {
     createConnection();
     getProvider();
       async function data() {
         let res = await getAllNftData();
         getNftTokenData();
       }
       data();
  }

  //create a connection
const createConnection = () => {
  // return new Connection(clusterApiUrl("devnet"));
  return new Connection("https://solana-api.projectserum.com/", {
    headers: {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Request-Headers":"*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type"
    },
    mode: 'no-cors'
    })
  // Connection("https://www.whateverorigin.org/get?url=" + clusterApiUrl("mainnet-beta"))
};

  //get NFT
  const getAllNftData = async () => {
    try {
      const connect =  createConnectionConfig("https://solana-api.projectserum.com/", {
        headers: {
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Request-Headers":"*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type"
        },
        mode: 'no-cors'
        })
      // const connect =  createConnectionConfig(clusterApiUrl("devnet"));
      const provider = getProvider();
      let ownerToken = publicKey;
      const result = isValidSolanaAddress(ownerToken);
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: ownerToken,
        connection: connect,
        serialization: true,
      });
      return nfts;
  } catch (error) {
    console.log(error);
  }
};

//Function to get all nft data
const getNftTokenData = async () => {
  try {
    var root = {
      data:{
        arr:[]
      } 
    };
    let nftData = await getAllNftData();
    var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    
    let n = data.length;
    for (let i = 0; i < n; i++) {
      let val = await axios.get(data[i].data.uri, {
        statusCode: 200,
        headers: {
          // "Access-Control-Allow-Origin":"*",
          // "Access-Control-Request-Headers":"*",
          // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type"
        },
        mode: 'no-cors'
      }
      );
      root.data.arr.push(val);
      let newJson = JSON.parse(JSON.stringify(root.data), (key, value) => {
        if (typeof value === 'number') {
          return value.toString();
        }
        if (typeof value === 'boolean') {
          return value.toString();
        }
        return value;
      });
      allNftData = newJson;
      // console.log(allNftData);
      console.log(i);
      unityContext.send("SolanaWalletConnect", "SetNFTData", JSON.stringify(allNftData));
    }
    console.log("Finished Loading NFTs");
    // console.log(JSON.stringify(allNftData));
    // unityContext.send("SolanaWalletConnect", "SetNFTData", JSON.stringify(allNftData));
    return root.data.arr;
  } catch (error) {
    console.log(error);
  }
};

const NFT = async (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  createConnection();
  getProvider();
useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      setNftData(res);
      setLoading(true);
      getNftTokenData();
    }
    data();
  }, []);
}
  
  useEffect( () => {
   setProvider(publicKey);
  }, []);
  useEffect( () => {
    setProvider(publicKey);
   }, []);

   useEffect(function () {    
    unityContext.on("NFT", function () {
      if ("solana" in window) {
      if (window.solana.isConnected) {
        // console.log(JSON.stringify(allNftData));
        unityContext.send("SolanaWalletConnect", "SetWalletAddress", provider.publicKey.toString());
        unityContext.send("SolanaWalletConnect", "SetNFTData", JSON.stringify(allNftData));
      } else {
        getProvider().then(provider => {
          // console.log('key', provider.publicKey.toString());
          publicKey = provider.publicKey.toString();
          unityContext.send("SolanaWalletConnect", "SetWalletAddress", provider.publicKey.toString());
          setProvider(provider.publicKey.toString());
        }).then(() => {
          letsgo();
        }).catch(function(error){
          console.log(error)
          console.log("fail to make connection5");
        });
      }
    } else {
      window.alert('Install https://www.phantom.app/');
    }
    });
  }, []);

  useEffect(function () {    
    unityContext.on("Logout", function () {
      if (window.solana.isConnected) {
        window.solana.disconnect();
        window.solana.on('disconnect', () => console.log("disconnected!"))
        unityContext.send("SolanaWalletConnect", "Disconnected");
      }
    });
  }, []);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      console.log("progress");
      setProgression(parseFloat(progression * 100).toFixed(2));
    });
  }, []);


  useEffect(function () {
    unityContext.on("loaded", function () {
      console.log("loaded");
      setIsLoaded(true);
    });
  }, []);

var some = "0";
  return (

  <div style = {{
    visibility: isLoaded ? "hidden" : "visible",
    backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      height: "100%",
      width: "100%",
      color: "#f5f5f5",
    position: 'absolute',
    left: 0,
    top: 0,
  }}>

   <p
    style={{ visibility: isLoaded ? "hidden" : "visible",
    height: "30px",
    width: "100%",
    position: "absolute",
    textAlign: 'center',
    bottom: "100px",
    fontSize: "2em",
    fontColor: "red",

    
 
    }}>Loading... {progression}%</p>

    
   
   <div>
   <Unity
      style={{ visibility: isLoaded ? "visible" : "hidden",
        height: "100%",
        width: "100%",
        background: "grey",
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: "hidden",
     
    }}
      unityContext={unityContext}
    />
    </div>
    </div>
  );

  }

  
  
export default App