import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxClientsPerBooking,
      nutritionPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
    console.log(value);
  }
  return (
    <Form>
      <FormRow label="Minimum days/booking">
        <Input
          type="number"
          id="min-days"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum days/booking">
        <Input type="number" id="max-days" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum clients/booking">
        <Input
          type="number"
          id="max-clients"
          defaultValue={maxClientsPerBooking}
        />
      </FormRow>
      <FormRow label="Nutrition price">
        <Input
          type="number"
          id="nutrition-price"
          defaultValue={nutritionPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
