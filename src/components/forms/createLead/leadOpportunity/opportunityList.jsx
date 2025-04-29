import React, { useEffect, useState } from 'react';
import { CustomButton, CustomInputField, CustomDropDown } from "react-mui-tailwind";
import EditIcon from '../../../../assets/edit.svg';
import EditOpportunityRow from './opportunityEdit';
import { getOpportunityList, opportunityUpdate } from '../../../../api/services/opportunityAPI/opportunityAPI';
import { getCategory, getStatus, getSubCategory } from '../../../../api/services/masterAPIs/createLeadApi';

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#858585',
};

const valueStyle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#17222B',
};

const LeadOpportunity = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, leadID }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [opportunityList, setOpportunityList] = useState();

  const [masterData, setMasterData] = useState({
    opportunityStatusList: [],
    opportunityCategoryList: [],
    opportunitySubCategoryList: [],
  });

  const [subCategoryData, setSubCategoryData] = useState({}); // Store subcategories by category ID


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [status, category] = await Promise.allSettled([
          getStatus(),
          getCategory(),
        ]);

        setMasterData((prev) => ({
          ...prev,
          opportunityStatusList: status?.status === "fulfilled" ? status.value?.data?.data || [] : [],
          opportunityCategoryList: category?.status === "fulfilled" ? category.value?.data?.data || [] : [],
        }));
        console.log("status", status, "category", category);
      } catch (error) {
        console.error('Error fetching master data:', error);
      }
    };

    fetchData();
  }, []);

  const findNameById = (list, id) => {
    const item = list.find((i) => i.id === id);
    return item?.name || "-";
  };

  useEffect(() => {
    if (leadID) {
      getOpportunityList(leadID)
        .then((result) => {
          console.log("result", result)
          setOpportunityList(result?.data)
        }
        )
        .catch((error) => console.log(error))
    }
  }, [leadID, editingId])

  // Fetch subcategory data for a given category
  const fetchSubCategory = async (categoryId) => {
    try {
      const result = await getSubCategory(categoryId); // Replace with your API call
      setSubCategoryData((prevData) => ({
        ...prevData,
        [categoryId]: result?.data?.data || [], // Store subcategories by category ID
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch subcategories for all categories in the opportunity list when component mounts
  useEffect(() => {
    if (opportunityList?.length > 0) {
      const categoryIds = [...new Set(opportunityList.map((item) => item.opportunity_category))];
      categoryIds.forEach((categoryId) => {
        if (!subCategoryData[categoryId]) {
          fetchSubCategory(categoryId); // Fetch subcategory only if not already fetched
        }
      });
    }
  }, [opportunityList]);

  const getStatusColor = (status) => {
    if (status === "Ready for Counsellor") return "#14AE5C";
    if (status === "Inprogress") return "#FF8400";
    return "#17222B";
  };

  const handleEditClick = (data) => {
    setEditingId(data.id);
    setFormData({ ...data });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (updatedData) => {

    console.log('Update payload:', formData, updatedData);

    const payload = {
      id: updatedData?.opportunityID || null,
      preffered_intake: updatedData?.intake,
      opportunity_owner: updatedData?.counsellor1,
      product_manager_id: updatedData?.counsellor2,
      preffered_study_destination: updatedData?.countryID,
      opportunity_category: updatedData?.opportunityCategory,
      opportunity_status: updatedData?.opportunityStatus,
      opportunity_subcategory: updatedData?.opportunitySubCatergory,
      note: updatedData?.notes,
      lead_id: updatedData?.lead_id,
    }

    console?.log("payload", payload)
    try {
      const response = await opportunityUpdate(updatedData?.opportunityID, payload);
      console.log('User created:', response?.data);
      if (response?.data?.succeeded === true) {
       setEditingId(null);
      }
      // Optional: reset form or show toast
    } catch (err) {
      console.error('Error creating user:', err);
    }
    // call API here
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  console.log("opportunityList", opportunityList)

  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Opportunity
      </h2>
      {opportunityList?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {opportunityList?.map((data) => {
            const isEditing = editingId == data.id;

            if (isEditing) {
              return (
                <EditOpportunityRow
                  key={data.id}
                  data={data}
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              );
            }

            // const categoryId = data?.opportunity_category;
            // const subCategories = subCategoryData[categoryId] || [];

            // const subCategoryName = subCategories.length > 0
            //   ? findNameById(subCategories, Number(data?.opportunity_subcategory))
            //   : "-";

            // Fetch subcategory name when category changes
            const categoryId = data?.opportunity_category;
            console.log("categoryId", categoryId)
            const subCategories = subCategoryData[categoryId] || [];
            console.log("subCategories", subCategories)
            const subCategoryName =
              subCategories.length > 0
                ? findNameById(subCategories, Number(data?.opportunity_subcategory))
                : "-";

            return (
              <div
                key={data?.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '16px',
                  border: '1px solid #CBDBE4',
                  borderRadius: '12px',
                  wordBreak: "break-word",
                }}
              >
                {/* Left side - Fields */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    flex: 1,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Country</label>
                    <div style={valueStyle}>{data?.country_name || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Opportunity ID</label>
                    <div style={valueStyle}>{data?.opportunityId || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Counsellor 1</label>
                    <div style={valueStyle}>{data?.owner_name || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Counsellor 2</label>
                    <div style={valueStyle}>{data?.owner_name2 || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Intake</label>
                    <div style={valueStyle}>{data?.preffered_intake || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Opportunity Status</label>
                    <div style={{ ...valueStyle, color: getStatusColor(data?.opportunity_status) }}>
                      {findNameById(masterData?.opportunityStatusList, Number(data?.opportunity_status)) || "-"}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Opportunity Category</label>
                    <div style={{ ...valueStyle, color: '#14AE5C' }}>{findNameById(masterData?.opportunityCategoryList, Number(data?.opportunity_category)) || "-"}</div>
                  </div>

                  <div>
                    <label style={labelStyle}>Opportunity Sub Category</label>
                    <div style={{ ...valueStyle, color: '#14AE5C' }}>
                      {/* {findNameById(masterData?.opportunitySubCategoryList, Number(data?.opportunity_subcategory))|| "-"} */}
                      {/* {getSubCategoryName(data?.opportunity_category, data?.opportunity_subcategory)} */}
                      {subCategoryName}
                    </div>
                  </div>
                </div>

                {/* Right side - Edit button */}
                <div
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <CustomButton
                    variant="icon"
                    iconImg={EditIcon}
                    endIcon={false}
                    showText={false}
                    onClick={() => handleEditClick(data)}
                  />
                </div>
              </div>

            );
          })}
        </div>
      ) : (
        <div> No Data</div>)}
    </div>
  );
};

export default LeadOpportunity;
