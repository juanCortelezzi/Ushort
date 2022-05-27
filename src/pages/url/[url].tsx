import { GetServerSideProps } from "next";
import { prisma } from "@/utils/prisma";

function redirectToHome() {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urlName = ctx.query.url;

  console.log(urlName);

  if (!urlName || Array.isArray(urlName)) return redirectToHome();

  const short = await prisma.short.findFirst({
    where: {
      name: urlName,
    },
  });

  if (!short) return redirectToHome();

  return {
    redirect: {
      destination: short.url,
      permanent: true,
    },
  };
};

const URLPage = () => {
  return <p>redirecting...</p>;
};

export default URLPage;
