import { Row, Col, Divider } from "antd";
import { FaMapLocationDot } from "react-icons/fa6"; // Ensure you have this import for the icons
import Input from "@/app/patients/new/AddressFields"; // Adjust the path as necessary

const AddressFields = ({ control, errors }: any) => {
  return (
    <>
      <Divider orientation="left">Address Information</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Input
            label="Woreda"
            prefix={<FaMapLocationDot />}
            name="address.woreda"
            control={control}
          />
          {errors.address?.woreda && (
            <span className="error-message">
              {errors.address?.woreda?.message}
            </span>
          )}
        </Col>

        <Col span={8}>
          <Input
            label="City"
            prefix={<FaMapLocationDot />}
            name="address.city"
            control={control}
          />
          {errors.address?.city && (
            <span className="error-message">
              {errors.address?.city?.message}
            </span>
          )}
        </Col>

        <Col span={8}>
          <Input
            label="State"
            prefix={<FaMapLocationDot />}
            name="address.state"
            control={control}
          />
          {errors.address?.state && (
            <span className="error-message">
              {errors.address?.state?.message}
            </span>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddressFields;
