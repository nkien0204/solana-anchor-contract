'use client';

import * as anchor from "@coral-xyz/anchor";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
//import { Program, web3 } from "@coral-xyz/anchor";
import {
    AnchorProvider,
    setProvider,
    Program,
    Idl,
} from "@coral-xyz/anchor";
import idl from "../../../target/idl/mycounter.json"; // Replace with the path to your IDL file
import { Mycounter } from "../../../target/types/mycounter";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";

import { getProgram } from '../anchorClient';
import { web3 } from "@coral-xyz/anchor";
import Child from './childComp';

import React, { useMemo } from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider, WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const wallets = [new UnsafeBurnerWalletAdapter()];

const App: React.FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/anza-xyz/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <Home />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;

const counterAccount = web3.Keypair.generate();

function Home() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    if (!wallet) {
        console.log("Wallet not connected");
        return;
    }
    console.log("wallet", wallet);
    //const wallet = new Wallet(walletKeypair);
    const provider = new AnchorProvider(connection, wallet, {});
    //setProvider(provider);
    //anchor.setProvider(provider);
    //const program = anchor.workspace.Mycounter as Program<Mycounter>;
    //const programId = new PublicKey(idl.address);
    //const program = new Program(idl as Idl, provider);
    const program = new Program(idl as Mycounter, provider);
    //const program = getProgram();
    if (!program) {
        console.log("Program not found");
        return;
    }

    // Example function to call a method from your Solana program
    const callMethod = async () => {
        try {
            const user = program.provider.publicKey || "";
            console.log("user", user);
            const tx = await program.methods
                .initialize()
                .accounts({
                    counter: counterAccount.publicKey,
                    user: program.provider.publicKey || "",
                    //systemProgram: anchor.web3.SystemProgram.programId,
                })
                .signers([counterAccount])
                .rpc();
            //const tx = await program.rpc.yourMethodName({
            //    accounts: {
            //        // Specify your accounts here
            //    },
            //});
            console.log('Transaction successful:', tx);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const increment = async () => {
        try {
            const user = program.provider.publicKey || "";
            console.log("user", user);
            const tx = await program.methods
                .increment()
                .accounts({
                    counter: counterAccount.publicKey,
                    //user: program.provider.publicKey || "",
                    //systemProgram: anchor.web3.SystemProgram.programId,
                })
                //.signers([counterAccount])
                .rpc();
            //const tx = await program.rpc.yourMethodName({
            //    accounts: {
            //        // Specify your accounts here
            //    },
            //});
            console.log('Transaction successful:', tx);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const decrement = async () => {
        try {
            const user = program.provider.publicKey || "";
            console.log("user", user);
            const tx = await program.methods
                .decrement()
                .accounts({
                    counter: counterAccount.publicKey,
                    //user: program.provider.publicKey || "",
                    //systemProgram: anchor.web3.SystemProgram.programId,
                })
                //.signers([counterAccount])
                .rpc();
            //const tx = await program.rpc.yourMethodName({
            //    accounts: {
            //        // Specify your accounts here
            //    },
            //});
            console.log('Transaction successful:', tx);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const getAccount = async () => {
        try {
            const account = await program.account.counter.fetch(counterAccount.publicKey);
            console.log('Account:', account);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <div>
                <h1>Welcome to Next.js with Anchor</h1>
                <button onClick={callMethod}>Call Method</button>
            </div>
            <div>
                <button onClick={increment}>Increment</button>
            </div>
            <div>
                <button onClick={decrement}>Decrement</button>
            </div>
            <div>
                <button onClick={getAccount}>Get account</button>
            </div>
        </div>
    );
}
