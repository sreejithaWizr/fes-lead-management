
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLead } from '../store/leadsSlice';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const CreateLeadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    secondaryEmail: '',
    mobileNumber: '',
    alternativeNumber: '',
    whatsappNumber: '',
    leadStatus: '',
    priority: '',
    teleCallerName: '',
    leadCreated: new Date().toISOString().split('T')[0],
    leadNumber: `LEAD${Math.floor(Math.random() * 900000) + 100000}`,
    agreeToReceive: false,
    
    highestQualification: '',
    graduationYear: '',
    fieldOfStudy: '',
    cgpaGrade: '',
    workExperience: '',
    preferredDestination: '',
    otherCountries: '',
    testRequired: false,
    testName: '',
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLead(formData)).then(() => {
      navigate('/leads');
    });
  };
  
  const tabs = ['All', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];
  
  const renderLeadInformationForm = () => (
    <div className="form-section animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Lead Information</h2>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter first name"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter last name"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="test@gmail.com"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Secondary Email</label>
          <input
            type="email"
            name="secondaryEmail"
            value={formData.secondaryEmail}
            onChange={handleChange}
            className="form-input"
            placeholder="-"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Mobile Number*</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="form-input"
            placeholder="(884) 819-3264"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Alternative Number</label>
          <input
            type="tel"
            name="alternativeNumber"
            value={formData.alternativeNumber}
            onChange={handleChange}
            className="form-input"
            placeholder="-"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Whatsapp Number</label>
          <input
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="form-input"
            placeholder="(884) 819-3264"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Lead Owner*</label>
          <div className="relative">
            <select
              name="leadOwner"
              value={formData.leadOwner}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="John">John</option>
              <option value="Jane">Jane</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Lead Status*</label>
          <div className="relative">
            <select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="Potential">Potential</option>
              <option value="Inactive">Inactive</option>
              <option value="Enrolled">Enrolled</option>
              <option value="May be Prospective">May be Prospective</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Priority*</label>
          <div className="relative">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Tele Caller</label>
          <div className="relative">
            <select
              name="teleCallerName"
              value={formData.teleCallerName}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="John">John</option>
              <option value="Jane">Jane</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Lead Created</label>
          <div className="relative">
            <input
              type="date"
              name="leadCreated"
              value={formData.leadCreated}
              onChange={handleChange}
              className="form-input"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33301 1.33337V3.33337" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 1.33337V3.33337" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.33301 6.06006H13.6663" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 5.66663V11.3333C14 13.3333 13 14.6666 10.6667 14.6666H5.33333C3 14.6666 2 13.3333 2 11.3333V5.66663C2 3.66663 3 2.33329 5.33333 2.33329H10.6667C13 2.33329 14 3.66663 14 5.66663Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="form-field">
          <label className="form-label">Lead Number</label>
          <input
            type="text"
            name="leadNumber"
            value={formData.leadNumber}
            readOnly
            className="form-input bg-gray-50"
          />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="agreeToReceive"
          name="agreeToReceive"
          checked={formData.agreeToReceive}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="agreeToReceive" className="text-sm">
          I agree to receive communications*
        </label>
      </div>
    </div>
  );
  
  const renderEducationQualificationForm = () => (
    <div className="form-section animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Education Qualification</h2>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Highest Qualification*</label>
          <div className="relative">
            <select
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Graduation Year*</label>
          <div className="relative">
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Field of Study*</label>
          <div className="relative">
            <select
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">CGPA/Grade</label>
          <input
            type="text"
            name="cgpaGrade"
            value={formData.cgpaGrade}
            onChange={handleChange}
            className="form-input"
            placeholder="-"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Work Experience (Years)</label>
          <div className="relative">
            <select
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              {Array.from({ length: 21 }, (_, i) => i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Preferred Study Destination</label>
          <div className="relative">
            <input
              type="text"
              name="preferredDestination"
              value={formData.preferredDestination}
              onChange={handleChange}
              className="form-input"
              placeholder="Other"
            />
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Other Countries</label>
          <div className="relative">
            <select
              name="otherCountries"
              value={formData.otherCountries}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="form-field">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="testRequired"
              checked={formData.testRequired}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Test Training Required</span>
          </label>
        </div>
        
        {formData.testRequired && (
          <div className="mt-4">
            <div className="form-field">
              <label className="form-label">Test Name</label>
              <input
                type="text"
                name="testName"
                value={formData.testName}
                onChange={handleChange}
                className="form-input"
                placeholder="-"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderLeadStatusForm = () => (
    <div className="form-section animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Lead Status</h2>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Status</label>
          <div className="relative">
            <select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="Potential">Potential</option>
              <option value="Inactive">Inactive</option>
              <option value="Enrolled">Enrolled</option>
              <option value="May be Prospective">May be Prospective</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Priority</label>
          <div className="relative">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderLeadSourceForm = () => (
    <div className="form-section animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Lead Source</h2>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Lead Source</label>
          <div className="relative">
            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className="form-select pr-8"
            >
              <option value="">Select</option>
              <option value="Meta">Meta</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Referral">Referral</option>
              <option value="Website">Website</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="pb-8">
      <div className="mb-4">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white text-[#757575] hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {(activeTab === 'All' || activeTab === 'Lead Information') && renderLeadInformationForm()}
        {(activeTab === 'All' || activeTab === 'Education Qualification') && renderEducationQualificationForm()}
        {(activeTab === 'All' || activeTab === 'Lead Status') && renderLeadStatusForm()}
        {(activeTab === 'All' || activeTab === 'Lead Source') && renderLeadSourceForm()}
      </form>
    </div>
  );
};

export default CreateLeadPage;
