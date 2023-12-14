import { useOutlet } from "react-router-dom";

function PageContainer() {
  const outlet = useOutlet();

  return <div>{outlet}</div>;
}

export default PageContainer;
