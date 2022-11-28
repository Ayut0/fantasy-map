import React, { useContext, useReducer, Dispatch, useEffect } from "react";

export interface LoggedUser {
  id: number;
  email: string;
  name: string;
}

interface AppContextState {
  loggedUser: LoggedUser | null;
  searchVal: string;
}

type AppContextAction =
  | {
      type: "login";
      payload: LoggedUser;
    }
  | {
      type: "logout";
    }
  | {
      type: "search";
      payload: string;
    };

interface Props {
  children: JSX.Element | JSX.Element[];
  initialState?: Partial<AppContextState>;
}

const defaultState: AppContextState = {
  loggedUser: null,
  searchVal: "",
};

const context = React.createContext<{
  state: AppContextState;
  dispatch: Dispatch<AppContextAction>;
}>({
  state: defaultState,
  dispatch: () => {
    // not implemented
  },
});

const reducer = (
  state: AppContextState,
  action: AppContextAction
): AppContextState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loggedUser: action.payload,
      };
    case "logout":
      return {
        ...state,
        loggedUser: null,
      };
    case "search":
      return {
        ...state,
        searchVal: action.payload,
      };
    default:
      throw "Invalid action";
  }
};

const AppContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(context);
};

export default AppContext;
