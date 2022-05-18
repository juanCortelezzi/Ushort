import { ThemeSwitch } from "@/components/themeSwitch";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [inputs, setInputs] = useState({ name: "", url: "" });

  const trpcContext = trpc.useContext();
  const { data, isLoading, isError } = trpc.useQuery(["urls"]);

  const urlMutation = trpc.useMutation("addUrl", {
    onSuccess(data) {
      setInputs({ name: "", url: "" });
      trpcContext.invalidateQueries("urls");
      trpcContext.setQueryData(["urls"], (old = []) => [...old, data]);
    },
  });

  useEffect(() => console.log(data), [data]);

  if (isError || !data) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  const onClick = () => {
    urlMutation.mutate(inputs);
  };

  return (
    <div>
      <Head>
        <title>Frontend Template</title>
        <meta
          name="description"
          content="Simple Frontend template, just Ctrl + c and Ctrl + v"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="prose prose-lg prose-h1:my-8 mx-auto">
        <div className="flex flex-col justify-center items-start">
          {data.map((url) => (
            <a key={url.name} href={url.url} className="link-secondary">
              {url.name}
            </a>
          ))}
        </div>
        <div className="my-4" />
        <div className="flex flex-col space-y-4">
          <input
            className="input input-bordered input-primary"
            placeholder="name"
            value={inputs.name}
            onChange={(e) =>
              setInputs((p) => {
                return { ...p, name: e.target.value };
              })
            }
          />
          <input
            className="input input-bordered input-primary"
            placeholder="url"
            value={inputs.url}
            onChange={(e) =>
              setInputs((p) => {
                return { ...p, url: e.target.value };
              })
            }
          />
          <button className="btn btn-primary" onClick={onClick}>
            clickme
          </button>
        </div>
        <div className="my-4" />
        <ThemeSwitch />
      </main>
    </div>
  );
};

export default Home;
