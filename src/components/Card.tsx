import React from "react";
import Link from "next/link";
import Image from "next/image";

type CardProps = {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  link?: string;
  bullets?: string[]
}
const Card = ({title, subtitle, description, tags, link, bullets}: CardProps) => {
  return (
      <div className={'flex flex-col py-4 px-8 bg-secondary rounded-2xl my-6 lg:w-4/5'}>
        <div className={'flex flex-row flex-wrap justify-between items-end mb-4'}>
          {!!link ? (
              <Link href={link} className={'flex flex-row gap-1 items-center'} target={'_blank'}>
                <p className={'text-2xl'}>{title}</p>
                <Image src={'/icon-external-link.png'} alt={'Link'} height={24} width={24} className={'h-4 w-4'}/>
              </Link>
          ) : (
              <p className={'text-2xl'}>{title}</p>
          )}
          <p className={'text-lightest'}>{subtitle}</ p>
        </div>
        <p>{description}</p>
        {bullets && (
            <ul className={'flex flex-col list-disc pl-5 my-3'}>
              {bullets.map(bullet => (
                  <li key={bullet}>{bullet}</li>
              ))}
            </ul>
        )}
        {tags && (
            <div className={'flex flex-row flex-wrap gap-3 mt-4'}>
              {tags.map(tag => (
                  <div key={tag} className={'bg-lightest text-primary py-1 px-3 rounded-full'}>{tag}</div>
              ))}
            </div>
        )}
      </div>
  )
}

export default Card