import React from 'react';
import { useFormikContext } from 'formik';

const accessStructure = {
  "Lead Management Module": {
    "Lead Form View Permission": {
      "Lead Information": [
        "First Name",
        "Last Name",
        "Email",
        "Secondary Email",
        "Mobile Number",
        "Alternative Number",
        "Whatsapp Number",
        "Priority",
        "Tele Caller",
        "Receive Communication"
      ],
      "Education Qualification": [
        "Highest Qualification",
        "Graduation Year",
        "Field of Study ",
        "CGPA/Grade",
        "Work Experience",
        "Intake Year",
        "Intake Month",
        "Preferred Study Destination",
        "Other Countries",
        "Test Training",
        "Test Names"
      ],
      "Lead Status": [
        "Status",
        "Category",
        "Subcategory",
        "Branch",
        "Notes",
      ],
      "Lead Source": [
        "Source 1",
        "Source 2",
        "Source 3",
        "Source 4",
        "Location 1",
        "Location 2",
        "Vertical",
        "Preferred Study Destination",
        "GCL ID",
        "ZC GAD",
        "Ad ID",
        "Ad Name",
        "Ad Campaign",
        "Key Identifier",
        "Campaign Type",
        "Referrer Name",
        "Referrer Email",
        "Referrer Employee ID",
        "Referrer Phone Number",
        "Lead Form",
        "User Agent",
        "Import Lead",
        "Invoke Blueprint",
        "Verse ID",
        "Desired Program ",
        "Internship Option",
        "Shortlisted Course ID",
        "Preferred Counsellor for FESTech1 Name",
        "Preferred Counsellor for FESTech1 Email Id"
      ],
      "Opportunity": [
        "Country",
        "Opportunity ID",
        "Counsellor",
        "Opportunity Status",
        "Preferred Intake",
      ]
    },
    "Lead Form Edit Permission": {
      "Lead Information": [
        "First Name",
        "Last Name",
        "Email",
        "Secondary Email",
        "Mobile Number",
        "Alternative Number",
        "Whatsapp Number",
        "Priority",
        "Tele Caller",
      ],
      "Education Qualification": [
        "Highest Qualification",
        "Graduation Year",
        "Field of Study ",
        "CGPA/Grade",
        "Work Experience",
        "Intake Year",
        "Intake Month",
        "Preferred Study Destination",
        "Other Countries",
        "Test Training",
        "Test Names"
      ],
      "Lead Status": [
        "Status",
        "Category",
        "Subcategory",
        "Branch",
        "Notes",
      ],
      "Lead Source": [
        "Source 1",
        "Source 2",
        "Source 3",
        "Source 4",
        "Location 1",
        "Location 2",
        "Vertical",
        "Preferred Study Destination",
        "GCL ID",
        "ZC GAD",
        "Ad ID",
        "Ad Name",
        "Ad Campaign",
        "Key Identifier",
        "Campaign Type",
        "Referrer Name",
        "Referrer Email",
        "Referrer Employee ID",
        "Referrer Phone Number",
        "Lead Form",
        "User Agent",
        "Import Lead",
        "Invoke Blueprint",
        "Verse ID",
        "Desired Program ",
        "Internship Option",
        "Shortlisted Course ID",
        "Preferred Counsellor for FESTech1 Name",
        "Preferred Counsellor for FESTech1 Email Id"
      ],
      "Opportunity": [
        "Country",
        "Opportunity ID",
        "Counsellor",
        "Opportunity Status",
        "Preferred Intake",
      ]
    },
  },
};

const RoleAccessPermission = () => {
  const { values, setFieldValue } = useFormikContext();

  const updateNestedFields = (paths, isChecked) => {
    const updated = structuredClone(values.access);
    let obj = updated;

    // Navigate to the target object
    for (const key of paths) {
      obj = obj[key];
    }

    // Recursively set all nested values
    const setAll = (node) => {
      if (typeof node === 'object' && node !== null) {
        for (const key in node) {
          if (typeof node[key] === 'object') {
            setAll(node[key]);
          } else {
            node[key] = isChecked;
          }
        }
      }
    };

    setAll(obj);
    setFieldValue('access', updated);
  };


  // const areAllChecked = (obj) =>
  //   typeof obj === 'object' &&
  //   Object.values(obj).every((val) =>
  //     typeof val === 'object' ? areAllChecked(val) : val === true
  //   );

  const areAllChecked = (obj) => {
    return Object.values(obj).every(value =>
      typeof value === 'object' ? areAllChecked(value) : value === true
    );
  };

  const areSomeChecked = (obj) => {
    return Object.values(obj).some(value =>
      typeof value === 'object' ? areSomeChecked(value) : value === true
    );
  };


  return (
    <div className="form-section p-[16px] animate-fade-in">
      <h2 className="font-bold text-[19px] mb-6">Role Access</h2>

      {Object.entries(accessStructure).map(([mainSection, subSections]) => (
        <div key={mainSection} className="mb-4">
          <div className="flex justify-between items-center">
            <h3 style={{ fontSize: "19px", fontWeight: "700" }}>{mainSection}</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                style={{ accentColor: 'black', height: "14px", width: "14px" }}
                checked={areAllChecked(values.access?.[mainSection])}
                onChange={(e) => updateNestedFields([mainSection], e.target.checked)}
              />
              <label style={{ fontSize: "16px", fontWeight: "400", paddingRight: 4 }}>Select all</label>
            </div>
          </div>

          {Object.entries(subSections).map(([subSection, groups]) => (
            <div key={subSection} className="pl-4 pr-4 pt-4 pb-4 mt-5" style={{ backgroundColor: "#F2F6F8", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
              <div className="flex items-center gap-[10px] pb-[10px] border-b" style={{ borderColor: "#CBDBE4" }}>
                <input
                  type="checkbox"
                  style={{ accentColor: 'black', height: "14px", width: "14px" }}
                  ref={(ref) => {
                    if (ref) {
                      ref.indeterminate = !areAllChecked(values.access?.[mainSection]?.[subSection]) &&
                        areSomeChecked(values.access?.[mainSection]?.[subSection]);
                    }
                  }}
                  checked={areAllChecked(values.access?.[mainSection]?.[subSection])}
                  onChange={(e) =>
                    updateNestedFields([mainSection, subSection], e.target.checked)
                  }
                />
                <h4 className="text-[16px] font-bold">{subSection}</h4>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", gap: "10px", overflowX: "auto" }}>
                {Object.entries(groups).map(([groupName, fields]) => (
                  <div key={groupName} style={{ marginLeft: 4, marginTop: 3, padding: "10px", display: "flex", flexDirection: "column", }}>
                    <div className="flex items-center gap-[10px]">
                      <input
                        type="checkbox"
                        style={{ accentColor: 'black', height: "14px", width: "14px" }}
                        ref={(ref) => {
                          if (ref) {
                            ref.indeterminate = !areAllChecked(
                              values.access?.[mainSection]?.[subSection]?.[groupName]
                            ) && areSomeChecked(
                              values.access?.[mainSection]?.[subSection]?.[groupName]
                            );
                          }
                        }}
                        checked={areAllChecked(
                          values.access?.[mainSection]?.[subSection]?.[groupName]
                        )}
                        onChange={(e) =>
                          updateNestedFields(
                            [mainSection, subSection, groupName],
                            e.target.checked
                          )
                        }
                      />
                      <p className="text-[16px]">{groupName}</p>
                    </div>

                    <div className='custom-scroll' style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "14px", width: "230px", height: "180px", backgroundColor: "#FFFFFF", borderRadius: "12px", overflowY: "auto", overflowX: "auto" }}>
                      {fields.map((field) => (
                        <label key={field} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            style={{ accentColor: 'black', height: "14px", width: "14px" }}
                            checked={
                              values.access?.[mainSection]?.[subSection]?.[groupName]?.[field] ||
                              false
                            }
                            onChange={(e) =>
                              setFieldValue(
                                `access.${mainSection}.${subSection}.${groupName}.${field}`,
                                e.target.checked
                              )
                            }
                          />
                          <span>{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RoleAccessPermission;