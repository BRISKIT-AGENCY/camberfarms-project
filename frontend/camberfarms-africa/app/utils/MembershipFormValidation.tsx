import * as Yup from 'yup';
type MembershipFormData = {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  country: string
  state: string
  region: string
}

export const membershipValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  region: Yup.string().required('Region is required'),
});


export const initialMembershipValues: MembershipFormData = {
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  state: '',
  region: '',
};