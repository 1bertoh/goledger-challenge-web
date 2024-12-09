import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { MoonStar, Sun } from 'lucide-react';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    scrollYProgress.onChange((value) => {
      setIsScrolled(value > 0);
    });

  }, [scrollYProgress]);

  useEffect(() => {
    const useTheme = () => {
      // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storagedTheme = localStorage.getItem('theme');

      if (storagedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false)
      }
    }

    useTheme()
  }, [])

  const switchTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Salva preferência no localStorage
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Salva preferência no localStorage
    }
  }

  return (
    <motion.div
      className={`w-full px-6 rounded-lg transition-all duration-500 fixed top-0 z-50 ${isScrolled
          ? 'bg-opacity-[0.17] backdrop-blur-sm bg-[#754F34] shadow-lg'
          : 'bg-opacity-[0.0] backdrop-blur-sm bg-[#754F34]'
        }`}
    >
      <div className='flex h-[72px] w-full justify-between items-center '>
        <a href='/'>
          <span className='font-extrabold text-3xl cursor-pointer'>
            GoStream
          </span>
        </a>
        <span onClick={switchTheme} className='cursor-pointer hover:scale-[1.1] transition-all'>
          {/* {
            isDark ?
            <Sun/> :
            <MoonStar/>
          } */}
        </span>
      </div>
    </motion.div>
  );
};

export default Navbar;
