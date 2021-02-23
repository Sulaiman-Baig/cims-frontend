import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [

            // Dashboards
            {
                id: 'dashboard',
                title: 'Dashboard',
                translate: 'Dashboard',
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard/show'
                // children: [
                //     {
                //         id: 'dash',
                //         title: 'Dashboard',
                //         type: 'item',
                //         url: '/dashboard/show'
                //     },              
                   
                // ]
            },
            // Enquries Management
            {
                id: 'enquries',
                title: 'Enquries',
                translate: 'Enquriries',
                type: 'collapsable',
                icon: 'search',
                children: [
                    {
                        id: 'create',
                        title: 'Create Enquiry',
                        type: 'item',
                        url: '/enquiry/create'
                    },
                    // {
                    //     id: 'bulk-import',
                    //     title: 'Import Bulk Enquiries',
                    //     type: 'item',
                    //     url: '/enquiry/bulk-import'

                    // },
                    {
                        id: 'followup',
                        title: 'Enquiry Follow Up',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'todayfollowup',
                                title: 'Today\'s Follow Up',
                                type: 'item',
                                url: '/enquiry/todaysfollowup',
                            },
                            {
                                id: 'todayenquiry',
                                title: 'Today\'s Enquiries',
                                type: 'item',
                                url: '/enquiry/todaysenquiries',
                            },
                            {
                                id: 'pipeline',
                                title: 'Pipeline',
                                type: 'collapsable',
                                children: [
                                    {
                                        id: 'prospective',
                                        title: 'Prospective',
                                        type: 'item',
                                        url: '/enquiry/prospective',
                                    },
                                    {
                                        id: 'needanalysis',
                                        title: 'Need Analysis',
                                        type: 'item',
                                        url: '/enquiry/needanalysis',

                                    },
                                    {
                                        id: 'proposal',
                                        title: 'Proposal',
                                        type: 'item',
                                        url: '/enquiry/proposal'
                                    },
                                    {
                                        id: 'negotiation',
                                        title: 'Negotiation',
                                        type: 'item',
                                        url: '/enquiry/negociation'
                                    },

                                ]
                            },
                        ]
                    },
                    {
                        id: 'successfullyenrolled',
                        title: 'Successfully Enrolled',
                        type: 'item',
                        url: '/enquiry/successfullyenrolled',

                    },
                    {
                        id: 'notinterested',
                        title: 'Not Interested',
                        type: 'item',
                        url: '/enquiry/notinterested'
                    },
                    // {
                    //     id: 'report',
                    //     title: 'Report',
                    //     type: 'item',
                    //     url: '/enquiry/reports'
                    // },
                ]
            },
            // Admission Management
            {
                id: 'admissions',
                title: 'Admissions',
                translate: 'Admissions ',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'create',
                        title: 'Create Admission',
                        type: 'item',
                        url: '/admission/create'
                    },
                    {
                        id: 'todayadmissions',
                        title: 'Today\'s Admissions',
                        type: 'item',
                        url: '/admission/today'

                    },
                    {
                        id: 'currentmonthadmissions',
                        title: 'Current Month Asmissions',
                        type: 'item',
                        url: '/admission/currentmonth',

                    },
                    {
                        id: 'currentyearadmissions',
                        title: 'Current Year Admissions',
                        type: 'item',
                        url: '/admission/currentyear'
                    },
                    {
                        id: 'alladmissions',
                        title: 'All Admissions',
                        type: 'item',
                        url: '/admission/all'
                    },
                ]
            },
              // Student Management
              {
                id: 'students',
                title: 'Student',
                translate: 'Students',
                type: 'collapsable',
                icon: 'school',
                children: [
                    {
                        id: 'currentstudents',
                        title: 'Current Students',
                        type: 'item',
                        url: '/student/students'
                    },
                    {
                        id: 'freezedstudents',
                        title: 'Freezed Students',
                        type: 'item',
                        url: '/student/freezed'
                    },
                    {
                        id: 'suspendedstudents',
                        title: 'Suspended Students',
                        type: 'item',
                        url: '/student/suspended'
                    },
                    {
                        id: 'alumnus',
                        title: 'Alumnus',
                        type: 'item',
                        url: '/student/alumnus'
                    },
                   
                ]
            },
            // Campus Management
            {
                id: 'campuses',
                title: 'Campus',
                translate: 'Campuses',
                type: 'collapsable',
                icon: 'account_balance',
                children: [
                    {
                        id: 'showCampus',
                        title: 'Campuses',
                        type: 'item',
                        url: '/campus/show'
                    },
                    // {
                    //     id: 'manage',
                    //     title: 'Manage Campus',
                    //     type: 'item',
                    //     url: '/campus/manage'

                    // },                   
                    // {
                    //     id: 'suspended',
                    //     title: 'Suspended Campus',
                    //     type: 'item',
                    //     url: '/campus/suspended',

                    // },
                    // {
                    //     id: 'all',
                    //     title: 'All Campus',
                    //     type: 'item',
                    //     url: '/campus/all'
                    // }
                ]
            },
            // Course Management
            {
                id: 'courses',
                title: 'Course',
                translate: 'Courses',
                type: 'collapsable',
                icon: 'book',
                children: [
                    {
                        id: 'creation',
                        title: 'Course Creation',
                        type: 'collapsable',
                        children: [
                           
                            {
                                id: 'categories',
                                title: 'Categories',
                                type: 'item',
                                url: '/course/showcategory'
                            },
                            {
                                id: 'create',
                                title: 'New Course',
                                type: 'item',
                                url: '/course/create'
                            },                         
                            {
                                id: 'outline',
                                title: 'Add Course Outline',
                                type: 'item',
                                url: '/course/outline'
        
                            },
                                  
                            {
                                id: 'faqs',
                                title: 'Add FAQ\'s',
                                type: 'item',
                                url: '/course/faqs',
        
                            },
                            {
                                id: 'video',
                                title: 'Upload Video Presentation',
                                type: 'item',
                                url: '/course/video'
                            }
                        ]
                    },
                    // {
                    //     id: 'upcoming',
                    //     title: 'Upcoming Courses',
                    //     type: 'item',
                    //     url: '/course/upcoming'

                    // },                   
                    // {
                    //     id: 'featured',
                    //     title: 'Featured Courses',
                    //     type: 'item',
                    //     url: '/course/featured',

                    // },
                    {
                        id: 'currentcourses',
                        title: 'Current Courses',
                        type: 'item',
                        url: '/course/all'
                    }
                ]
            },
             // Batch Management
             {
                id: 'batches',
                title: 'batch',
                translate: 'Batches',
                type: 'collapsable',
                icon: 'reorder',
                children: [
                    {
                        id: 'new',
                        title: 'New Batch',
                        type: 'item',
                        url: '/batch/create'
                    },
                    {
                        id: 'upcoming',
                        title: 'Upcoming Batches',
                        type: 'item',
                        url: '/batch/up-coming'
                    },
                    {
                        id: 'recently-started',
                        title: 'Recently Started Batches',
                        type: 'item',
                        url: '/batch/recently-started'
                    },
                    {
                        id: 'inprogress',
                        title: 'In Progress Batches',
                        type: 'item',
                        url: '/batch/in-progress'
                    },
                    {
                        id: 'recently-ended',
                        title: 'Recently Ended Batches',
                        type: 'item',
                        url: '/batch/recently-ended'
                    },
                    {
                        id: 'ended',
                        title: 'Ended Batches',
                        type: 'item',
                        url: '/batch/ended'
                    },
                   
                ]
            },
            // Employee Management
            {
                id: 'employees',
                title: 'Employee Management',
                translate: 'Employees',
                type: 'collapsable',
                icon: 'account_box',
                children: [
                    {
                        id: 'showempployee',
                        title: 'Current Employees',
                        type: 'item',
                        url: '/employee/show'
                    },
                   
                   
                ]
            },
            // User Management
            {
                id: 'users',
                title: 'User',
                translate: 'Users',
                type: 'collapsable',
                icon: 'account_box',
                children: [
                    {
                        id: 'showuser',
                        title: 'Current Users',
                        type: 'item',
                        url: '/user/show'
                    },
                    // {
                    //     id: 'create',
                    //     title: 'New User',
                    //     type: 'item',
                    //     url: '/user/create'
                    // },
                   
                ]
            },
            // Accounts Management
            {
                id: 'account',
                title: 'Accounts',
                translate: 'Accounts',
                type: 'collapsable',
                icon: 'account_balance',
                children: [
                    {
                        id: 'showCampus',
                        title: 'Campuses',
                        type: 'item',
                        url: '/campus/show'
                    },
                    // {
                    //     id: 'manage',
                    //     title: 'Manage Campus',
                    //     type: 'item',
                    //     url: '/campus/manage'

                    // },                   
                    // {
                    //     id: 'suspended',
                    //     title: 'Suspended Campus',
                    //     type: 'item',
                    //     url: '/campus/suspended',

                    // },
                    // {
                    //     id: 'all',
                    //     title: 'All Campus',
                    //     type: 'item',
                    //     url: '/campus/all'
                    // }
                ]
            },
            // Event Management
            // {
            //     id: 'event',
            //     title: 'Event',
            //     translate: 'Event Management',
            //     type: 'collapsable',
            //     icon: 'event',
            //     children: [
            //         {
            //             id: 'create',
            //             title: 'Create Event',
            //             type: 'item',
            //             url: '/event/create'
            //         },
            //         {
            //             id: 'manage',
            //             title: 'Manage Event',
            //             type: 'item',
            //             url: '/event/update'
            //         },
            //         {
            //             id: 'show',
            //             title: 'Events',
            //             type: 'item',
            //             url: '/event/show'
            //         },
                   
            //     ]
            // },

        ]
    }
];
