export const determineScreenSize = () =>{
    const screenWidth = window.innerWidth;
   return {
    isMobile:  screenWidth < 768,
    isDesktop: screenWidth > 768
   }
}