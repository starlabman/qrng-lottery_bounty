import { ConnectButton as MetamaskButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

export default function ConnectButton() {
  const nbsp = "\u00A0";

  return (
    <MetamaskButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={
              connected ? "wallet-wrapper slide-in-top-bar" : "connect-wrapper"
            }
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="button connect"
                    onClick={openConnectModal}
                    type="button"
                  >
                    {" "}
                    Connect{nbsp}Wallet{nbsp}to{nbsp}Play!!
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="button"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  <button
                    className="button picture"
                    onClick={openChainModal}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <picture
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </picture>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="button"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    <span className="balance">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                  </button>
                </>
              );
            })()}
          </div>
        );
      }}
    </MetamaskButton.Custom>
  );
}
