import React from "react";

const ServerData = React.createContext();

export const useServerData = () => {
  const context = React.useContext(ServerData);

  if (!context) {
    throw new Error("useServerData must be used within a ServerDataProvider");
  }

  return context;
};

export const ServerDataProvider = ({ data, ...rest }) => {
  return <ServerData.Provider value={data} {...rest} />;
};
