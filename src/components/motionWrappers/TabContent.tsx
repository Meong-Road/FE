/**
 * TabContent Motion Wrapper
 * Tab 컨텐츠 전환 애니메이션만 제공하는 단순한 래퍼
 * 탭 UI는 직접 구현하고 컨텐츠 애니메이션만 필요할 때 사용
 */

"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { tabContentVariants } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface TabContentProps {
  /**
   * 현재 선택된 탭의 고유 키 (애니메이션 트리거용)
   */
  tabKey: string | number;
  /**
   * 탭 컨텐츠
   */
  children: ReactNode;
  /**
   * 컨텐츠 컨테이너 클래스
   */
  className?: string;
  /**
   * 애니메이션 지속 시간 (초)
   * @default 0.2
   */
  duration?: number;
}

/**
 * TabContent 컴포넌트
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('tab1');
 *
 * <TabContent tabKey={activeTab}>
 *   {activeTab === 'tab1' ? <Tab1Content /> : <Tab2Content />}
 * </TabContent>
 * ```
 */
export function TabContent({
  tabKey,
  children,
  className,
  duration = 0.2,
}: TabContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={tabContentVariants}
        transition={{ duration }}
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
