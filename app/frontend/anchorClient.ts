import * as anchor from "@coral-xyz/anchor";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
//import { Program, web3 } from "@coral-xyz/anchor";
import {
  AnchorProvider,
  setProvider,
  Program,
  web3,
  Idl,
} from "@coral-xyz/anchor";
import idl from "../../target/idl/mycounter.json"; // Replace with the path to your IDL file
import { Mycounter } from "../../target/types/mycounter";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const clusterUrl = process.env.NEXT_PUBLIC_SOLANA_CLUSTER || "";
//const walletPrivateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;

function loadKeypairFromFile(firstWinPrivKey: number[]): Keypair {
  // const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
  let firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
  return firstWinWallet;
}

// Read the id.json file
//const secret = JSON.parse(
//  fs.readFileSync("/Users/kn/.config/solana/id.json", "utf8")
//);
//
//// Convert the private key to a base58 string
//const walletPrivateKey = bs58.encode(Buffer.from(keypair));
//console.log("walletPrivateKey", walletPrivateKey);

const getProvider = () => {
  //const secret = [
  //  96, 219, 143, 25, 82, 225, 146, 47, 8, 64, 125, 30, 233, 167, 37, 134, 102,
  //  136, 123, 9, 162, 157, 19, 29, 189, 121, 79, 165, 143, 27, 233, 65, 113,
  //  222, 15, 150, 65, 208, 71, 35, 213, 183, 211, 158, 133, 4, 204, 17, 178, 63,
  //  24, 162, 217, 147, 157, 3, 166, 252, 89, 70, 247, 125, 89, 246,
  //].slice(0, 32);
  //const walletKeypair = loadKeypairFromFile(secret);
  //const walletKeypair = web3.Keypair.fromSeed(
  //  Uint8Array.from(secret.slice(0, 32))
  //);
  //const connection = new Connection(clusterUrl, "processed");
  //const wallet = web3.Keypair.fromSecretKey(
  //  new Uint8Array(JSON.parse(walletKeypair.secretKey.toString()))
  //);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  if (!wallet) {
    console.log("Wallet not connected");
    return;
  }
  //const wallet = new Wallet(walletKeypair);
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  return provider;
};

const getProgram = () => {
  //const provider = anchor.AnchorProvider.env();
  //anchor.setProvider(provider);
  //
  //const program = anchor.workspace.Mycounter as Program<Mycounter>;
  //const provider = getProvider();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  if (!wallet) {
    console.log("Wallet not connected");
    return;
  }
  //const wallet = new Wallet(walletKeypair);
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  //anchor.setProvider(provider);
  //const program = anchor.workspace.Mycounter as Program<Mycounter>;
  //const programId = new PublicKey(idl.address);
  //const program = new Program(idl as Idl, provider);
  const program = new Program(idl as Mycounter, provider);
  return program;
};

export { getProgram };
