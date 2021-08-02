import { Test, TestingModule } from '@nestjs/testing'
import { GameroomsResolver } from './gamerooms.resolver'
import { GameroomsService } from './gamerooms.service'

describe('GameroomsResolver', () => {
  let resolver: GameroomsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameroomsResolver, GameroomsService],
    }).compile()

    resolver = module.get<GameroomsResolver>(GameroomsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
