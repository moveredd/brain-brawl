import React from 'react';
import Link from 'next/link';

import { Bebas_Neue } from 'next/font/google';
const BFont = Bebas_Neue({ subsets: ['latin'], weight: '400' });


const PointsCount = () => {
  return (
    <Link href="#">
        <button className={`bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 bg-linear-to-r from-cyan-600 to-blue-500 transition text-3xl border ${BFont.className}`}>
        Question <br/>
        1/10
        </button>
    </Link>
  )
}

export default PointsCount