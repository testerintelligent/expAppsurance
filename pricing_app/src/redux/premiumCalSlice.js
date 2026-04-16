import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const calculatePremium = createAsyncThunk(
  "motor/calculatePremium",
  async (formData, { rejectWithValue }) => {
    try {
      const base = "http://10.192.190.158:5001";

      const res = await axios.post(`${base}/api/pricing/calculate`, {
        product: formData.product,
        policyDate: formData.policyDate,
        input: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          licenseType: formData.licenseType,
          drivingExperience: formData.drivingExperience,
          claimHistory: formData.claimHistory,
          vehicleAge: formData.vehicleAge,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const initialState = {
  form: {
    product: "PERSONAL_AUTO",
    policyDate: "2026-05-01",
    country: "",
    state: "",
    city: "",
    licenseType: "LMV",
    drivingExperience: 5,
    claimHistory: 1,
    vehicleAge: 3,
  },
  premium: null,
  loading: false,
  error: null,
};

const premiumSlice = createSlice({
  name: "pricingcalculation",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculatePremium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculatePremium.fulfilled, (state, action) => {
        state.loading = false;
        state.premium = action.payload;
      })
      .addCase(calculatePremium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateForm } = premiumSlice.actions;
export default premiumSlice.reducer;
