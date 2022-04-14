import useStore from "./useStore";

const withStore = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const store = useStore();

    return <WrappedComponent {...store} {...props} />;
  };
  return WrapperComponent;
};

export default withStore;
