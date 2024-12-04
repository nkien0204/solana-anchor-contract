import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { Mycounter } from "../target/types/mycounter";
//import { Program, AnchorProvider, setProvider, web3 } from "@coral-xyz/anchor";
import { Keypair, SystemProgram } from "@solana/web3.js";
import bs58 from "bs58";

function loadKeypairFromFile(firstWinPrivKey: number[]): Keypair {
  // const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
  let firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
  return firstWinWallet;
}

describe("mycounter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Mycounter as Program<Mycounter>;
  //
  //it("Is initialized!", async () => {
  //  // Add your test here.
  //  const counterAccount = anchor.web3.Keypair.generate();
  //
  //  //const tx = await program.methods.initialize().rpc();
  //  const tx = await program.methods
  //    .initialize()
  //    .accounts({
  //      counter: counterAccount.publicKey,
  //      user: provider.wallet.publicKey,
  //      //systemProgram: anchor.web3.SystemProgram.programId,
  //    })
  //    .signers([counterAccount])
  //    .rpc();
  //
  //  console.log("Your transaction signature", tx);
  //});

  //const counterAccount = anchor.web3.Keypair.generate();
  //it("Is increment!", async () => {
  //  const a = [
  //    11, 4, 22, 103, 105, 128, 25, 153, 86, 216, 133, 175, 178, 87, 91, 72, 81,
  //    72, 60, 55, 210, 187, 80, 130, 74, 168, 95, 208, 149, 200, 37, 185, 163,
  //    38, 232, 214, 32, 239, 199, 108, 192, 237, 66, 117, 207, 6, 167, 113, 228,
  //    27, 94, 16, 158, 8, 143, 73, 132, 10, 234, 98, 178, 226, 19, 124,
  //  ].slice(0, 32);
  //  const counterAccount = loadKeypairFromFile(a);
  //
  //  // Add your test here.
  //  //const tx = await program.methods.increment().rpc();
  //
  //  //const counterAccount = anchor.web3.Keypair.generate();
  //  //console.log(
  //  //  "Counter account:",
  //  //  counterAccount.publicKey.toString(),
  //  //  counterAccount.secretKey.toString()
  //  //);
  //  //const accountInfo = await connection.getAccountInfo(newKeypair.publicKey);
  //
  //  //const pubKey = "ELrz8qrR7tTe9kzC1uAD62ADZMdWMv3f9jqrwvx4AAtq";
  //  // Call the initialize method on the program
  //  //await program.methods
  //  //  .initialize()
  //  //  .accounts({
  //  //    counter: counterAccount.publicKey,
  //  //    user: provider.wallet.publicKey,
  //  //    //systemProgram: anchor.web3.SystemProgram.programId,
  //  //  })
  //  //  .signers([counterAccount])
  //  //  .rpc();
  //
  //  //const tx = await program.methods.initialize().rpc();
  //  const tx = await program.methods
  //    .increment()
  //    .accounts({
  //      counter: counterAccount.publicKey,
  //      //user: provider.wallet.publicKey,
  //      //systemProgram: anchor.web3.SystemProgram.programId,
  //    })
  //    //.signers([counterAccount])
  //    .rpc();
  //  console.log("Your transaction signature", tx);
  //
  //  const account = await program.account.counter.fetch(
  //    counterAccount.publicKey
  //    //pubKey
  //  );
  //  console.log("Counter account:", account);
  //});

  it("Is decrement!", async () => {
    const a = [
      96, 219, 143, 25, 82, 225, 146, 47, 8, 64, 125, 30, 233, 167, 37, 134,
      102, 136, 123, 9, 162, 157, 19, 29, 189, 121, 79, 165, 143, 27, 233, 65,
      113, 222, 15, 150, 65, 208, 71, 35, 213, 183, 211, 158, 133, 4, 204, 17,
      178, 63, 24, 162, 217, 147, 157, 3, 166, 252, 89, 70, 247, 125, 89, 246,
    ].slice(0, 32);
    const counterAccount = loadKeypairFromFile(a);
    console.log("a", counterAccount.secretKey.toString());

    const tx = await program.methods
      .decrement()
      .accounts({
        counter: counterAccount.publicKey,
        //user: provider.wallet.publicKey,
        //systemProgram: anchor.web3.SystemProgram.programId,
      })
      //.signers([counterAccount])
      .rpc();
    console.log("Your transaction signature", tx);

    const account = await program.account.counter.fetch(
      counterAccount.publicKey
      //pubKey
    );
    console.log("Counter account:", account);
  });
});
