import React, { useContext, useReducer, Dispatch } from "react";

export interface LoggedUser {
  id: number;
  email: string;
  name: string;
}

export interface AlertMessage {
  type: "success" | "error";
  message: string;
  duration?: number;
}

interface AppContextState {
  loggedUser: LoggedUser | null;
  searchVal: string;
  profileData: any | null;
  selectedCategory: number | null;
  alert: AlertMessage | null;
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
    }
  | {
      type: "setProfileData";
      payload: any;
    }
  | {
      type: "searchCategory";
      payload: number;
    }
  | {
      type: "alert";
      payload: AlertMessage | null;
    };

interface Props {
  children: JSX.Element | JSX.Element[];
  initialState?: Partial<AppContextState>;
}

const defaultState: AppContextState = {
  loggedUser: null,
  searchVal: "",
  profileData: null,
  selectedCategory: null,
  alert: null,
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
    case "setProfileData":
      return {
        ...state,
        profileData: action.payload,
      };
    case "searchCategory":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "alert":
      return {
        ...state,
        alert: action.payload,
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
