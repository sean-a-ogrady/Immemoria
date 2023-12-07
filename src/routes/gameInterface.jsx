import React, { useState, useRef, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, Cog6ToothIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function GameInterface() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;

        // Temporarily shrink to get the correct scrollHeight
        textarea.style.height = '2px'; // Set to a small height to force scrollHeight to adjust

        // Calculate the necessary height (either scrollHeight or max-height)
        const newHeight = Math.min(textarea.scrollHeight, 128); // 128px as the maximum height

        // Apply the new height
        textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        window.addEventListener('resize', checkScreenSize);

        // Clean up
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);


    const handleSettingsClick = () => {
        // Implement logic to open settings window
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents the default action (new line)
            handleSubmit(); // Calls your submit function
        }
    };

    const handleSubmit = () => {
        // Logic to handle the submit action
        console.log('Submitting:', textareaRef.current.value);
        // Reset textarea
        textareaRef.current.value = '';
        adjustTextareaHeight(); // Adjust the height of the textarea after resetting
    };

    const toggleSidebar = () => { setIsDesktopSidebarOpen(!isDesktopSidebarOpen); };

    const sidebarWidth = isDesktopSidebarOpen ? '320px' : '0px';

    return (
        <div className="flex flex-row min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] border-t border-light-primary-text dark:border-dark-primary-text bg-light-background dark:bg-dark-background">
            {/* Sidebar */}
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        {/* Mobile Sidebar Toggle */}
                        <div className={`${open ? "bottom-4" : "bottom-20"} sm:hidden fixed right-4 z-20`}>
                            <Disclosure.Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-full text-light-primary-text dark:text-dark-primary-text hover:bg-light-secondary-text dark:hover:bg-dark-secondary-text transition-colors duration-200">
                                <span className="sr-only">Toggle sidebar</span>
                                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                            </Disclosure.Button>
                        </div>


                        {/* Combined Sidebar Content for Mobile and Desktop */}
                        {/* Some ugly code I wrote in order to handle window resizing for the menu */}
                        <div
                            className={`${open ? 'block' : 'hidden'} h-full sm:block px-4 py-2
                                ${isDesktopSidebarOpen ? 'sm:w-[320px] sm:px-4 sm:py-2' : 'sm:w-0 sm:px-0 sm:py-0'} 
                                w-[100vw] bg-light-sidebar dark:bg-dark-sidebar z-10 flex flex-col overflow-y-auto
                                ${isSmallScreen ? "" : "border-r border-light-primary-text dark:border-dark-primary-text"}`}
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
                                <Cog6ToothIcon className="h-5 w-5 mr-2" />
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
            <div className={`${(isMobileMenuOpen && isSmallScreen) ? "hidden" : ""} flex-grow flex flex-col justify-between bg-light-background dark:bg-dark-background`}>
                {/* Chat Container */}
                <div className="flex flex-col overflow-y-auto p-4 space-y-4">
                    {/* Placeholder for chat messages */}
                </div>

                {/* Input Area */}
                <div className="flex items-center justify-center p-4">
                    <div className="flex items-center max-w-3xl w-full">
                        <textarea
                            ref={textareaRef}
                            onChange={adjustTextareaHeight}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-grow resize-none p-2 rounded-md border border-light-secondary-text dark:border-dark-secondary-text bg-light-background dark:bg-dark-background text-light-primary-text dark:text-dark-primary-text overflow-auto h-10 max-h-32"
                        />
                        <button
                            onClick={handleSubmit}
                            className="ml-2 flex items-center justify-center p-2 rounded-md text-light-primary-text dark:text-dark-primary-text hover:bg-light-secondary-text dark:hover:bg-dark-secondary-text transition-colors duration-200"
                        >
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
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
