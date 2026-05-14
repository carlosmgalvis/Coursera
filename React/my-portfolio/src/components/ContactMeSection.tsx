import { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
// Import the components from your UI snippets folder (v3 requirement)
import { Field } from "./ui/field"; 
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { createListCollection } from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit, { type ContactFormData } from "../hooks/useSubmit";
import { useAlertContext } from "../context/useAlertContext.ts";


const enquiryOptions = createListCollection({
  items: [
    { label: "Freelance project proposal", value: "hireMe" },
    { label: "Open source consultancy session", value: "openSource" },
    { label: "Other", value: "other" },
  ],
});

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const formik = useFormik<ContactFormData>({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      // url and values
      submit("https://example.com/contact", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string().optional(),
      comment: Yup.string()
        .min(25, "Must be at least 25 characters")
        .required("Required"),
    }),
  });


useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
    // Including formik and onOpen is safe here
  }, [response, onOpen, formik]);

  return (
    <FullScreenSection isDarkBackground backgroundColor="#512DA8" py={16} gap={8}>
      <VStack w="full" maxWidth="1024px" p={{ base: 8, md: 32 }} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack gap={4}>
              {/* FIX: Use 'Field' instead of FormControl/Label/ErrorMessage */}
              <Field
                label="Name"
                invalid={!!formik.errors.firstName && formik.touched.firstName}
                errorText={formik.errors.firstName}
              >
                <Input
                  id="firstName"
                  {...formik.getFieldProps("firstName")}
                />
              </Field>

              <Field
                label="Email Address"
                invalid={!!formik.errors.email && formik.touched.email}
                errorText={formik.errors.email}
              >
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
              </Field>

              <Field label="Type of enquiry">
                <SelectRoot
                  collection={enquiryOptions}
                  value={[formik.values.type]}
                  onValueChange={(e: { value: string[] }) => formik.setFieldValue("type", e.value[0])}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {enquiryOptions.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>

              <Field
                label="Your message"
                invalid={!!formik.errors.comment && formik.touched.comment}
                errorText={formik.errors.comment}
              >
                <Textarea
                  id="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
              </Field>

              <Button
                type="submit"
                colorPalette="purple" // colorScheme is now colorPalette
                width="full"
                loading={isLoading} // isLoading is now loading
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;