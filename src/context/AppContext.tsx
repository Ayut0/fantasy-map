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

export interface List {
  title: string;
  description: string;
  category: number;
  places: number[];
  file: File | undefined;
  previewUrl: string;
}

interface AppContextState {
  loggedUser: LoggedUser | null;
  searchVal: string;
  profileData: any | null;
  selectedCategory: number | null;
  alert: AlertMessage | null;
  list: List | null;
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
    }
  | {
     type: "list";
     payload: List | null;
    }
  | {
      type: "updateName";
      payload: string;
    }

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
  list: null,
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
        profileData: null,
      };
    case "logout":
      return {
        ...state,
        loggedUser: null,
        profileData: null,
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
    case "list":
      return {
        ...state,
        list: action.payload,
      }
    case "updateName":
      return {
        ...state,
        loggedUser: state.loggedUser ? {
          ...state.loggedUser,
          name: action.payload,
        } : null,
      }
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
