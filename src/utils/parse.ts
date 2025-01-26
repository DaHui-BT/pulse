
// type TocType = { title: string | undefined, lineIndex: string | null, indent: number }

/**
 * 解析 Markdown 内容，提取标题信息
 * @param markdownContent 需要被解析的 markdown 内容 
 * @returns 返回解析后的格式
 */
// export const parseToc = (htmlContent: string) => {
//   const tocs : TocType[] = []
//   const parser = new DOMParser()
//   const htmlDoc = parser.parseFromString(htmlContent, 'text/html')
//   const headings = Array.from(htmlDoc.querySelectorAll('h1, h2, h3, h4, h5, h6'))

//   let titles = headings.filter((title) => !!title.textContent?.trim());

//   if (!titles.length) {
//     titles = [];
//     return tocs;
//   }

//   const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

//   titles.forEach(el => {
//     tocs.push({
//       title: el.textContent?.trim(),
//       lineIndex: el.getAttribute('data-v-md-line'),
//       indent: hTags.indexOf(el.tagName),
//     })
//   })

//   return tocs
// }


type TocType = {key: number, title: string | null, href: string, lineIndex: string | null, children: TocType[]}
type StackType = { level: number, item: TocType }

export const parseToc = (htmlContent: string, prefixPath: string): TocType[] => {
  
  const tocs : TocType[] = []
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(htmlContent, 'text/html')
  const headings = Array.from(htmlDoc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  let key = 1
  
  const stack : StackType[] = [];
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.slice(1));
    const item = {
      key: key ++,
      title: heading.textContent,
      href: '#' + heading.getAttribute('data-v-md-line'),
      // href: '#' + heading.textContent,`
      // href: '#' + prefixPath + '#/' + heading.textContent,
      // href: prefixPath + `${prefixPath.includes('?') ? '&' : '?'}data-v-md-line=` + heading.getAttribute('data-v-md-line'),
      lineIndex: heading.getAttribute('data-v-md-line'),
      children: [],
    };
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    if (stack.length === 0) {
      tocs.push(item);
    } else {
      stack[stack.length - 1].item.children.push(item);
    }
    stack.push({ level, item });
  });

  return tocs
}


export type { TocType }
