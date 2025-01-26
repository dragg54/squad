
const Settings = () => {
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">
      <div className="md:w-[50%] pb-28">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold md:text-2xl">Settings</p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        <ul>
          <li className="settings-header">Profile</li>
          <li className="settings-menu">Edit Profile</li>
        </ul>
        <ul>
          <li className="settings-header">Notifications</li>
          <li className="settings-menu">Email Notification</li>
          <li className="settings-menu">Goal Notification</li>
          <li className="settings-menu">Birthday Notification</li>
        </ul>
        <ul>
          <li className="settings-header">Account</li>
          <li className="settings-menu">Delete Account</li>
        </ul>
        <ul>
        </ul>
      </ul>
    </section>
  )
}

export default Settings