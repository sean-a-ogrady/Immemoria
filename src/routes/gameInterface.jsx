import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, CogIcon } from '@heroicons/react/24/outline';

export default function GameInterface() {

    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

    const handleSettingsClick = () => {
        // Implement logic to open settings window
    };

    const toggleSidebar = () => { setIsDesktopSidebarOpen(!isDesktopSidebarOpen); };

    const sidebarWidth = isDesktopSidebarOpen ? '320px' : '0px';

    return (
        <div className="flex flex-row min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] bg-light-background dark:bg-dark-background">
            {/* Sidebar */}
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        {/* Mobile Sidebar Toggle */}
                        <div className="sm:hidden fixed bottom-4 right-4 z-20">
                            <Disclosure.Button className="p-2 rounded-full bg-light-accent dark:bg-dark-accent">
                                <span className="sr-only">Toggle sidebar</span>
                                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                            </Disclosure.Button>
                        </div>

                        {/* Combined Sidebar Content for Mobile and Desktop */}
                        <div
                            className={`${open ? 'block' : 'hidden'} h-full sm:block px-4 py-2
                                ${isDesktopSidebarOpen ? 'sm:w-[320px] sm:px-4 sm:py-2' : 'sm:w-0 sm:px-0 sm:py-0'} 
                                w-[100vw] bg-light-sidebar dark:bg-dark-sidebar z-10 flex flex-col overflow-y-auto`}
                            style={{ transition: 'width 0.3s' }}
                        >
                            {/* Section header - Memories */}
                            <h2 className="py-2 text-m font-medium text-light-primary-text dark:text-dark-primary-text">Memories</h2>

                            <hr className="my-4 border-light-secondary-text dark:border-dark-secondary-text" />

                            {/* Character */}
                            <SidebarSection title="Character" />

                            {/* Inventory */}
                            <SidebarSection title="Inventory" />

                            {/* Map */}
                            <SidebarSection title="Map" />

                            {/* dividing line */}
                            <hr className="my-4 border-light-secondary-text dark:border-dark-secondary-text" />

                            {/* Settings */}
                            <button
                                onClick={handleSettingsClick}
                                className="flex items-center w-full mb-3 text-left font-semibold text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
                            >
                                <CogIcon className="h-5 w-5 mr-2" />
                                Settings
                            </button>
                        </div>
                    </>
                )}
            </Disclosure>

            {/* Sidebar Toggle Button for Desktop */}
            <div className="hidden sm:flex sm:absolute sm:left-[320px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-1 z-20" style={{ left: isDesktopSidebarOpen ? '320px' : '0px', transition: 'left 0.3s' }}>
                <button
                    onClick={toggleSidebar}
                    className="text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
                >
                    {isDesktopSidebarOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                </button>
            </div>

            {/* Center Content */}
            <div className="flex-grow flex justify-center">
                {/* Center content here */}
            </div>
        </div>
    );
}

const SidebarSection = ({ title }) => (
    <Disclosure>
        {({ open }) => (
            <>
                <Disclosure.Button className="flex justify-between w-full py-2 text-sm font-medium text-left text-light-primary-text dark:text-dark-primary-text hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200">
                    {title}
                    <span className="ml-2">
                        {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-light-secondary-text dark:text-dark-secondary-text">
                    {/* Placeholder content for each section */}
                    Content for {title}
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
);
