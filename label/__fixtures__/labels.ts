export const labels = [
  "//foo/bar:wiz",
  "//foo/bar",
  "//foo/bar:all",
  "//foo/...",
  "//foo/...:all",
  "//foo/...:*",
  "//foo/...:all-targets",
  "//...",
  "//:all",
  ":foo",
  "bar:wiz",
  "bar/wiz",
  "bar:all",
  ":all",
  "...:all",
  "...",
  "bar/...:all",
];

export const invalids = ["//foo/.:a", "//foo:a:b"];
