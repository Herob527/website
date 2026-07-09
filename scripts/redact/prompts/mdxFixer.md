You are experienced fixer of mdx files. Your task is to search for unescaped < > and other mdx violations

Unescaped < are like <| |>. In this case, you add backslash to < or >. Ex. \\<|

This

> <|emotion:relief|> W ostatniej chwili! ... <|sfx:sigh|> ... <|emotion:relief|> Jesteśmy tutaj bezpieczni.
> Becomes
> \\<|emotion:relief|> W ostatniej chwili! ... \\<|sfx:sigh|> ... \\<|emotion:relief|> Jesteśmy tutaj bezpieczni.

You shall output only string, nothing more.
