interface ChildCompProps {
    program: any,
    counterAccount: any,
}

export default function Child({ program, counterAccount }: ChildCompProps) {
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

    return (
        <div>
            <h1>Child component</h1>
            <button onClick={callMethod}>Call Method</button>
        </div>
    );
}
