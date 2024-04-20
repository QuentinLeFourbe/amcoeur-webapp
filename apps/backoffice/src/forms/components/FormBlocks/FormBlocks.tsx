import { FormBlockClient, QuestionClientData } from "@amcoeur/types";
import { move } from "../../../global/utils/array";
import FormInput from "../../../global/components/molecules/Form/FormInput";
import DynamicContainer from "../../../global/components/organisms/DynamicContainer/DynamicContainer";
import { AddButton } from "../../../global/components/atoms/AddButton/AddButton";
import { createBlock } from "../../utils/form";
import FormQuestions from "../FormQuestions/FormQuestions";

type FormBlocksProps = {
  value: FormBlockClient[];
  onChange: (blocks: FormBlockClient[]) => void;
  onBlur: (blocks: FormBlockClient[]) => void;
  questionsData: QuestionClientData[];
};

function FormBlocks({
  value: blocks,
  onChange,
  onBlur,
  questionsData,
}: FormBlocksProps) {
  const handleChange = (block: FormBlockClient, index: number) => {
    const tmpBlocks = [...blocks];
    tmpBlocks[index] = block;
    onChange(tmpBlocks);
  };

  const handleBlur = (block: FormBlockClient, index: number) => {
    const tmpBlocks = [...blocks];
    tmpBlocks[index] = block;
    onBlur(tmpBlocks);
  };

  const handleMoveBlockUp = (index: number) => {
    const movedBlocks = move(blocks, index, index - 1) as FormBlockClient[];
    onChange(movedBlocks);
  };

  const handleMoveBlockDown = (index: number) => {
    const movedBlocks = move(blocks, index, index + 1) as FormBlockClient[];
    onChange(movedBlocks);
  };

  const handleDeleteBlock = (index: number) => {
    const tmpBlocks = [...blocks];
    tmpBlocks.splice(index, 1);
    onChange(tmpBlocks);
  };

  return (
    <>
      {blocks.map((block, index) => (
        <DynamicContainer
          key={block.id}
          onMoveUp={index !== 0 ? () => handleMoveBlockUp(index) : undefined}
          onMoveDown={index +1 !== blocks.length ? () => handleMoveBlockDown(index) : undefined}
          onDelete={() => handleDeleteBlock(index)}
        >
          <FormInput
            onChange={(e) => {
              handleChange({ ...block, title: e.target.value }, index);
            }}
            onBlur={(e) => {
              handleBlur({ ...block, title: e.target.value }, index);
            }}
          >
            Titre
          </FormInput>
          <FormInput
            type="checkbox"
            onChange={(e) =>
              handleChange({ ...block, isCompact: e.target.checked }, index)
            }
            onBlur={(e) =>
              handleBlur({ ...block, isCompact: e.target.checked }, index)
            }
          >
            Compacte
          </FormInput>
          <FormQuestions
            value={block.questions}
            onChange={(questions) =>
              handleChange({ ...block, questions }, index)
            }
            onBlur={(questions) => handleBlur({ ...block, questions }, index)}
            questionsData={questionsData}
          />
        </DynamicContainer>
      ))}
      <AddButton onClick={() => onChange([...blocks, createBlock()])} />
    </>
  );
}

export default FormBlocks;
