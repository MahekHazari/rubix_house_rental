import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const PriceBreakdown = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      BaseRent: propertyDetails.priceBreakdown.BaseRent,
      Utilities: propertyDetails.priceBreakdown.Utilities,
      Deposit: propertyDetails.priceBreakdown.Deposit,
      CAM: propertyDetails.priceBreakdown.CAM,
    },
    validate: {
      BaseRent: (value) => (value < 0 ? "Base Rent cannot be negative" : null),
      Utilities: (value) => (value < 0 ? "Utilities cannot be negative" : null),
      Deposit: (value) => (value < 0 ? "Deposit cannot be negative" : null),
      CAM: (value) => (value < 0 ? "CAM cannot be negative" : null),
    },
  });

  const { BaseRent, Utilities, Deposit, CAM } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      if (!propertyDetails.title || !propertyDetails.description || !propertyDetails.price) {
        toast.error("Please fill all required fields.", { position: "bottom-right" });
        return;
      }

      setPropertyDetails((prev) => ({
        ...prev,
        priceBreakdown: { BaseRent, Utilities, Deposit, CAM },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          priceBreakdown: { BaseRent, Utilities, Deposit, CAM },
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
       
          BaseRent: 0,
          Utilities: 0,
          Deposit: 0,
          CAM: 0,
        
        userEmail: "",
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="Base Rent"
          min={0}
          {...form.getInputProps("BaseRent")}
        />
        <NumberInput
          withAsterisk
          label="Utilities"
          min={0}
          {...form.getInputProps("Utilities")}
        />
        <NumberInput
          withAsterisk
          label="Deposit"
          min={0}
          {...form.getInputProps("Deposit")}
        />
        <NumberInput
          withAsterisk
          label="CAM"
          min={0}
          {...form.getInputProps("CAM")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PriceBreakdown;
