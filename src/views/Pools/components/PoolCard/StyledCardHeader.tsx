import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@kongswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string; isPromotedPool?: boolean }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
  border-radius: ${({ theme, isPromotedPool }) =>
    isPromotedPool ? '31px 31px 0 0' : `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  earningTokenSymbol: string
  stakingTokenSymbol: string
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
  isPromotedPool?: boolean
}> = ({
  earningTokenSymbol,
  stakingTokenSymbol,
  isFinished = false,
  isAutoVault = false,
  isStaking = false,
  isPromotedPool = false,
}) => {
  const { t } = useTranslation()
  const poolImageSrc = isAutoVault
    ? `cake-cakevault.svg`
    : `${earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase()
  const isKongPool = earningTokenSymbol === 'KONG' && stakingTokenSymbol === 'KONG'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    // if (isKongPool) {
    //   // manual cake
    //   return t('Manual')
    // }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    // if (isKongPool) {
    //   return t('Earn KONG, stake KONG')
    // }
    return t('Stake %symbol%', { symbol: stakingTokenSymbol })
  }

  return (
    <Wrapper isPromotedPool={isPromotedPool} isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'primary'} scale="lg">
            {`${getHeadingPrefix()} ${earningTokenSymbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        <Image src={`/images/pools/${poolImageSrc}`} alt={earningTokenSymbol} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
