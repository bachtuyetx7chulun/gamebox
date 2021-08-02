import { Test, TestingModule } from '@nestjs/testing'
import { GameroomsService } from './gamerooms.service'

describe('GameroomsService', () => {
  let service: GameroomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameroomsService],
    }).compile()

    service = module.get<GameroomsService>(GameroomsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
