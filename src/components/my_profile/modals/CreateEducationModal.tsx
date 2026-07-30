import EducationFormModal from "./EducationFormModal";

const CreateEducationModal = (props: any) => {
  return (
    <EducationFormModal
      {...props}
      title="Create Education"
      buttonText="Create Education"
    />
  );
};

export default CreateEducationModal;