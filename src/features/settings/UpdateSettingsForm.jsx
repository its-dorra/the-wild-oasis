import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const handleUpdate = function (e, fieldName) {
    const { value } = e.target;
    if (!value) return;

    updateSetting({ [fieldName]: value });
  };

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          disabled={isUpdating}
          id='min-nights'
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          disabled={isUpdating}
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          disabled={isUpdating}
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          disabled={isUpdating}
          id='breakfast-price'
          defaultValue={breakFastPrice}
          onBlur={(e) => handleUpdate(e, 'breakFastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
