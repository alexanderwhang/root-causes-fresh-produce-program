export const MenuItems = [
    {
        title: 'Home',
        url: "/",
        cName: 'nav-links'
    },
    {
        title: 'Participants',
        url: "/participants",
        cName: 'nav-links'
    },
    {
        title: 'Volunteer Info',
        url: "/vol_info",
        cName: 'nav-links'
    },
    {
        title: 'Volunteer Management',
        url: "/vol_manage",
        cName: 'nav-links',
        submenu: [
            {
                title: 'CALLERS',
                url: "/callers",
                cName: 'nav-links'
            },
            { 
                title: 'DRIVERS',
                url: "/drivers",
                cName: 'nav-links'
            }
        ]
    },
    // {
    //     title: 'Analytics',
    //     url: "/analytics",
    //     cName: 'nav-links'
    // },
    {
        title: 'Account',
        url:"/",
        cName: 'nav-links-mobile'
    },
]