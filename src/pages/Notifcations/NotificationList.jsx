const notifications = [
  {
    id: 1,
    message: 'User mentioned you in a comment',
    subMessage: '',
    timestamp: '2025-04-22T02:02:00Z',
    read: false,
    type: 'mention',
  },
  {
    id: 2,
    message: 'System update available',
    subMessage: '',
    timestamp: '2025-05-13T17:30:00Z',
    read: true,
    type: 'general',
  },
  {
    id: 3,
    message: 'Lead LM00XX has been assigned to you',
    subMessage: 'Priority: P1 | SLA = 8 hours (same day)',
    timestamp: '2025-04-22T02:02:00Z',
    read: false,
    type: 'lead',
  },
  {
    id: 4,
    message: 'Successfully uploaded 502 Leads to our system',
    subMessage: '',
    timestamp: '2025-05-13T17:45:00Z',
    read: true,
    type: 'lead',
  },
  {
    id: 5,
    message: 'Lead LM00XX has been assigned to you',
    subMessage: 'Priority: P1 | SLA = 8 hours (same day)',
    timestamp: '2025-04-22T02:02:00Z',
    read: false,
    type: 'lead',
  },
//   {
//     id: 6,
//     message: 'Successfully uploaded 500 Leads to our system',
//     subMessage: '',
//     timestamp: '2025-05-13T17:45:00Z',
//     read: true,
//     type: 'lead',
//   },
];

// Utility function to format timestamp
const formatTimestamp = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInDays = Math.floor(diffInMinutes / (60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  if (diffInDays === 1) {
    return `Yesterday at ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }
  return `${date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const NotificationList = ({ activeTab }) => {
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return !notification.read;
    if (activeTab === 'Read') return notification.read;
    if (activeTab === 'Lead Updates') return notification.type === 'lead';
    return false;
  });

  return (
    <ul className="space-y-3">
      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((notification) => (
          <li
            key={notification.id}
            className="w-[500px] h-24 p-3 rounded-xl border border-gray-200 flex items-start gap-[10px] bg-white"
          >
            <div className="flex-1">
              <p className="font-proxima-nova font-bold text-[16px] leading-[140%] text-[#17222B]">
                {notification.message}
              </p>
              {notification.subMessage && (
                <p className="font-proxima-nova font-normal text-sm leading-[140%] text-[#17222B] mt-1">
                  {notification.subMessage}
                </p>
              )}
              <p className="font-proxima-nova font-normal text-[13px] leading-[140%] text-[#818B94] mt-2">
                {formatTimestamp(notification.timestamp)}
              </p>
            </div>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
            )}
          </li>
        ))
      ) : (
        <li className="w-[510px] p-3 text-gray-500 font-proxima-nova font-normal text-base">
          No notifications
        </li>
      )}
    </ul>
  );
};

export default NotificationList;