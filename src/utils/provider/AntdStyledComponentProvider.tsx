"use client";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";
const AntdStyledComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = createCache();
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  const render = <>{children}</>;

  if (typeof window !== "undefined") {
    return render;
  }

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      {children}
    </StyleProvider>
  );
};

export default AntdStyledComponentProvider;
