import Link from "@docusaurus/Link";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import React from "react";
import type { Contact } from "@site/src/data/contacts";
import styles from "./styles.module.css";

/**
 * Vẽ thẳng path của icon Font Awesome, không qua <FontAwesomeIcon>.
 *
 * VÌ SAO TRƯỚC ĐÓ TRÔNG SAI: mỗi liên hệ khai một file .svg logo nhiều màu
 * riêng, mà component lại ưu tiên nhánh đó, nên nhánh Font Awesome không bao
 * giờ chạy tới — `faIcon` chỉ nằm đó làm cảnh. Bốn logo ấy khác nhau cả hình
 * lẫn màu: GitHub tròn đen, LinkedIn vuông xanh, điện thoại tròn xanh lá. Xếp
 * cạnh nhau thành một bộ sticker chứ không ra một hàng icon.
 *
 * VÌ SAO KHÔNG DÙNG <FontAwesomeIcon>: component đó cần
 * `@fortawesome/fontawesome-svg-core/styles.css` (12 KB) được nạp sẵn. Không có
 * thì lúc render đầu tiên nó tự chèn một thẻ <style> vào head — mà SSR không
 * chèn được, nên có một nhịp icon hiện ra đúng kích thước gốc rồi mới co lại.
 * Đúng kiểu giật vừa phải sửa ở trang chủ.
 *
 * Dùng thẳng dữ liệu icon thì không cần CSS nào, không có gì chèn lúc chạy, và
 * chỉ bốn định nghĩa icon được đóng gói. Vẫn là artwork của Font Awesome.
 */
function FaIcon({
  icon,
  size = 22,
}: {
  icon: IconDefinition;
  size?: number;
}): React.ReactElement {
  const [width, height, , , path] = icon.icon;
  // Icon Font Awesome không vuông: GitHub 496x512, LinkedIn 448x512. Ép cả hai
  // chiều bằng nhau thì viewBox sẽ thêm đệm hai bên, làm các icon trông to nhỏ
  // khác nhau. Neo theo chiều cao rồi suy ra chiều rộng để quang học đồng đều.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={Math.round((size * width) / height)}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false">
      <path d={Array.isArray(path) ? path.join(" ") : path} />
    </svg>
  );
}

export default function ContactItem({
  icon,
  contact,
  title,
}: {
  icon: IconDefinition;
  contact: Contact;
  title: string;
}): React.ReactElement {
  return (
    <Link
      className={clsx(styles.cardInfoButton)}
      title={title}
      aria-label={title}
      to={contact.link}>
      <FaIcon icon={icon} />
    </Link>
  );
}
