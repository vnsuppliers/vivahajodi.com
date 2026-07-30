import EducationFormModal from "./EducationFormModal";

const EditEducationModal = (props: any) => {
  return (
    <EducationFormModal
      {...props}
      title="Edit Education"
      buttonText="Update Education"
    />
  );
};

export default EditEducationModal;