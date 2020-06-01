export default (state, action) => {
  switch (action.type) {
    case "GROCERIES":
      return {
        ...state,
        groceriesIsActive: true,
        eatingOutIsActive: false,
        miscVariableIsActive: false,
        fixedIsActive: false,
        randomIsActive: false,
      };
    case "EATING_OUT":
      return {
        ...state,
        groceriesIsActive: false,
        eatingOutIsActive: true,
        miscVariableIsActive: false,
        fixedIsActive: false,
        randomIsActive: false,
      };
    case "MISC":
      return {
        ...state,
        groceriesIsActive: false,
        eatingOutIsActive: false,
        miscVariableIsActive: true,
        fixedIsActive: false,
        randomIsActive: false,
      };
    case "FIXED":
      return {
        ...state,
        groceriesIsActive: false,
        eatingOutIsActive: false,
        miscVariableIsActive: false,
        fixedIsActive: true,
        randomIsActive: false,
      };
    case "RANDOM":
      return {
        ...state,
        groceriesIsActive: false,
        eatingOutIsActive: false,
        miscVariableIsActive: false,
        fixedIsActive: false,
        randomIsActive: true,
      };
    default:
      return state;
  }
};
