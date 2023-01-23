import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from 'rxjs';
import { GameService } from "../api/game/game.service";

@Injectable()
export class GameStatusGuard implements CanActivate {

  constructor(
    private readonly gameService: GameService
  ) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const gameId = request.params.id;
    return this.validateRequest(gameId);
  }

  async validateRequest(gameId) {
    const game = await this.gameService.getGame(gameId);
    if (game.status === 'finished') {
      throw new HttpException('Cannot play on a finished game', HttpStatus.BAD_REQUEST)
    }
    return true;
  }
}