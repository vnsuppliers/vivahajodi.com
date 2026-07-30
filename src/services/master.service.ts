import api from './api';

const MASTER_URL = '/master';

export const masterService = {
  getCountries: async () => {
    const res = await api.get(`${MASTER_URL}/countries/all`);
    return res.data;
  },

  getStates: async (countryId: number) => {
    const res = await api.get(`${MASTER_URL}/states/by-country/${countryId}`);
    return res.data;
  },

  getCities: async (stateId: number) => {
    const res = await api.get(`${MASTER_URL}/cities/by-state/${stateId}`);
    return res.data;
  },

  getReligions: async () => {
    const res = await api.get(`${MASTER_URL}/religion/get_religions`);
    // console.log("Religions fetched:", res.data);
    return res.data || [];
  },

  getGenders: async () => {
    const res = await api.get(`${MASTER_URL}/gender/get_genders`);
    return res.data;
  },

  getMaritalStatuses: async () => {
    const res = await api.get(`${MASTER_URL}/marital-status/get_marital_statuses`);
    return res.data;
  },

getMotherTongues: async () => {
  const res = await api.get(`${MASTER_URL}/mother-tongue/get_all_mother_tongues`);
  // console.log("Mother Tongues fetched:", res.data);
  return res.data || [];
},


getEducation: async () => {
  const res = await api.get(
    `${MASTER_URL}/education/get_education`
  );

  return res.data || [];
},

getSpecialisations: async (educationId: string | number) => {
  const res = await api.get(
    `${MASTER_URL}/specialisation/get_specialisations/${educationId}`
  );

  return res.data || [];
},


getProfessionMaster: async () => {
  const res = await api.get(
    `${MASTER_URL}/profession_master/get_profession_master`
  );

  // console.log("Professions fetched:", res.data);
  return res.data || [];
},


getDesignationMaster: async (professionId: number | string) => {
  const res = await api.get(
    `/master/designation_master/by-profession/${professionId}`
  );
  return res.data || [];
},

/**
 * get subscriptions plans list.
 */
getSubscriptionsPlans: async () => {
  const res = await api.get(`${MASTER_URL}/subscription-plans/get_plains_list`);
  return res.data || [];
},

/**
 * 
 * @returns get suncriptions plan for active users
 */
getUserActiveSubscriptionPlan: async () => {
  const res = await api.get(
      `${MASTER_URL}/subscription-plans/get_user_active_plan`
    );
    // console.log('Active user package payload output: ', res.data);
    return res.data;
},

/**
 * get global success stories and ratings.
 */
getSuccessStoryRatings: async () => {
  const res = await api.get('shared/get-success-story-ratings');
  return res.data;
},

};