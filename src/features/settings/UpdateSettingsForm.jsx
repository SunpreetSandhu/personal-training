import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateSettingsForm() {
  return (
    <Form>
      <FormRow label="Minimum days/booking">
        <Input type="number" id="min-days" />
      </FormRow>
      <FormRow label="Maximum days/booking">
        <Input type="number" id="max-days" />
      </FormRow>
      <FormRow label="Maximum clients/booking">
        <Input type="number" id="max-clients" />
      </FormRow>
      <FormRow label="Nutrition price">
        <Input type="number" id="nutrition-price" />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
