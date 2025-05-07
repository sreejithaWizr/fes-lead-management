import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoleManagement from '../pages/settings/RoleManagement';
import UserManagement from '../pages/settings/UserManagement'
import OrganisationManagement from '../pages/settings/OrganisationManagement';

const tabs = [
  { name: "Role Management", component: RoleManagement },
  { name: "User Management", component: UserManagement },
  { name: "Organisation Management", component: OrganisationManagement },
];

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');

  const defaultTab = "Organisation Management";
  const activeTab = tabs.find(tab => tab.name === urlTab)?.name || defaultTab;
  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component;

  const handleTabClick = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  useEffect(() => {
    if (!tabs.find(tab => tab.name === urlTab)) {
      setSearchParams({ tab: defaultTab });
    }
  }, [urlTab, setSearchParams]);

  return (
    <div >
      <div
        className="flex items-center border-b"
        style={{
          width: '594px',
          height: '61px',
          borderBottom: '1px solid var(--Secondary-S75, #CBDBE4)',
          gap: '24px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              style={{
                width: isActive ? 'auto' : 'auto',
                height: '61px',
                borderBottom: isActive ? '3px solid var(--Text-T500, #17222B)' : 'none',
                // fontFamily: '"Proxima Nova", "san-sarif"',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: isActive ? '#17222B' : '#96B7C8', // gray-500
              }}
              className={`pb-2 text-left`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default SettingsPage;
