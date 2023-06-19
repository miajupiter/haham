export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M24 21h2v5h-2zm-4-5h2v10h-2zm-9 10a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3v-2a5 5 0 0 1 0 10z"></path><path fill="currentColor" d="M28 2H4a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h24a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm0 9H14V4h14ZM12 4v7H4V4ZM4 28V13h24l.002 15Z"></path></svg>',
  },
  {
    text: 'Data Logs',
    path: '/data-logs',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M.5 7.01h4L6 4.5L7.5 10l2-2.99h4M12.77 4A6.51 6.51 0 0 0 1.23 4m0 6a6.51 6.51 0 0 0 11.54 0"></path></svg>',
  },
  {
    text: 'Machines',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 10a16.84 16.84 0 0 0-9 3.244A16.84 16.84 0 0 0 3 10v2.96a2.004 2.004 0 0 0-2 2.007v1.004c0 1.109 2 2.208 2 2.208v2.007a14.868 14.868 0 0 1 7.417 2.55A15.09 15.09 0 0 1 12 24a15.09 15.09 0 0 1 1.583-1.264A14.868 14.868 0 0 1 21 20.186v-2.208a2.004 2.004 0 0 0 2-2.007v-1.004a2.004 2.004 0 0 0-2-2.007Zm-9 11.422a16.841 16.841 0 0 0-7-2.996v-6.15a14.8 14.8 0 0 1 5.417 2.282A15.09 15.09 0 0 1 12 15.822a15.09 15.09 0 0 1 1.583-1.264A14.8 14.8 0 0 1 19 12.275v6.151a16.841 16.841 0 0 0-7 2.996ZM11 8h2v1h-2zm0-4h2v1h-2z"></path><path fill="currentColor" d="M11 10h2v1h-2zM9 5a1 1 0 0 0 1-1a.983.983 0 0 0-.99-.99A.995.995 0 1 0 9 5Z"></path><circle cx="15" cy="4" r="1" fill="currentColor"></circle><path fill="currentColor" d="M16 8H8a3.003 3.003 0 0 1-3-3V3a3.003 3.003 0 0 1 3-3h8a3.003 3.003 0 0 1 3 3v2a3.003 3.003 0 0 1-3 3ZM8 2a1.001 1.001 0 0 0-1 1v2a1.001 1.001 0 0 0 1 1h8a1.001 1.001 0 0 0 1-1V3a1.001 1.001 0 0 0-1-1Z"></path></svg>',
    items: [
      {
        text: 'Machine Status',
        path: '/machine-status',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21q-.825 0-1.413-.588T2 19V5q0-.825.588-1.413T4 3h16q.825 0 1.413.588T22 5v14q0 .825-.588 1.413T20 21H4Zm0-2h16V5H4v14Zm5-2q.425 0 .713-.288T10 16q0-.425-.288-.713T9 15H6q-.425 0-.713.288T5 16q0 .425.288.713T6 17h3Zm5.55-4.825l-.725-.725q-.3-.3-.7-.287t-.7.312q-.275.3-.288.7t.288.7L13.85 14.3q.3.3.7.3t.7-.3l3.55-3.55q.3-.3.3-.7t-.3-.7q-.3-.3-.713-.3t-.712.3l-2.825 2.825ZM9 13q.425 0 .713-.288T10 12q0-.425-.288-.713T9 11H6q-.425 0-.713.288T5 12q0 .425.288.713T6 13h3Zm0-4q.425 0 .713-.288T10 8q0-.425-.288-.713T9 7H6q-.425 0-.713.288T5 8q0 .425.288.713T6 9h3ZM4 19V5v14Z"></path></svg>',
      },
      {
        text: 'Machine Logs',
        path: '/machine-logs',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M18.749 3a2.25 2.25 0 0 1 2.25 2.25v13.502a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18.752V5.25A2.25 2.25 0 0 1 5.25 3h13.499zm0 1.5H5.25a.75.75 0 0 0-.75.75v13.502c0 .414.336.75.75.75h13.499a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75zm-10.494 7l1.557-3.551a.75.75 0 0 1 1.333-.08l.05.102l2.381 5.947l1.003-2.004a.75.75 0 0 1 .566-.407l.105-.007h2a.75.75 0 0 1 .102 1.493L17.25 13h-1.537l-1.542 3.081a.75.75 0 0 1-1.319.043l-.048-.1l-2.337-5.835l-1.035 2.362a.75.75 0 0 1-.577.44l-.11.009H6.75a.75.75 0 0 1-.102-1.493l.102-.007h1.505l1.557-3.551L8.255 11.5z" fill="currentColor" fillRule="nonzero"></path></svg>',
      },
    ],
  },
  {
    text: 'Tasks',
    path: '/tasks',
    icon: 'globe',
  },
  {
    text: 'Machines',
    path: '/machines',
    icon: 'globe',
  },
  {
    text: 'Tasks',
    path: '/tasks1',
    icon: 'globe',
  },
  {
    text: 'Machines',
    path: '/machines1',
    icon: 'globe',
  },
  {
    text: 'Tasks',
    path: '/tasks2',
    icon: 'globe',
  },
  {
    text: 'Tasks',
    path: '/tasks3',
    icon: 'globe',
  },
  // {
  //   text: 'Profile',
  //   icon: 'user',
  //   items: [
  //     {
  //       text: 'My Profile',
  //       path: '/profile',
  //       icon: 'user',
  //     },
  //     {
  //       text: 'Log out',
  //       path: '/logout',
  //       icon: 'runner',
  //     },
  //   ],
  // },
  {
    text: 'Machines',
    path: '/machines3',
    icon: 'globe',
  },
]
