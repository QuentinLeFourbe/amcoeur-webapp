import { ComponentProps } from "react";
import { useGetPages } from "../../hooks/pagesQueries";
import FormContentPanel from "./FormContentPanel";

type WrappedFormContentPanelProps = Omit<
  ComponentProps<typeof FormContentPanel>,
  "pages"
>;
function WrappedFormContentPanel(props: WrappedFormContentPanelProps) {
  const { data: { data: pagesData } = {}, isSuccess } = useGetPages();
  return isSuccess && <FormContentPanel {...props} pages={pagesData} />;
}

export default WrappedFormContentPanel;
